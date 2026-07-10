'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type RegularizationRequest } from '@/lib/demo-data'

export interface RealtimeAnnouncement {
  id: string
  title: string
  content: string
  target_role?: string
  created_at: string
}

interface UseRealtimeOptions {
  onPetitionUpdate?: (petition: RegularizationRequest) => void
  onAnnouncement?: (announcement: RealtimeAnnouncement) => void
}

export function useRealtimeSubscriptions({
  onPetitionUpdate,
  onAnnouncement,
}: UseRealtimeOptions = {}) {
  useEffect(() => {
    // 1. Supabase Realtime Channels
    const supabase = createClient()
    const isLiveSupabase =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')

    let channel: ReturnType<typeof supabase.channel> | null = null

    if (isLiveSupabase) {
      channel = supabase
        .channel('amisphere-global-realtime')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'regularization_requests' },
          (payload) => {
            if (onPetitionUpdate && payload.new) {
              onPetitionUpdate(payload.new as unknown as RegularizationRequest)
            }
          }
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'regularization_requests' },
          (payload) => {
            if (onPetitionUpdate && payload.new) {
              onPetitionUpdate(payload.new as unknown as RegularizationRequest)
            }
          }
        )
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'announcements' },
          (payload) => {
            if (onAnnouncement && payload.new) {
              onAnnouncement(payload.new as unknown as RealtimeAnnouncement)
            }
          }
        )
        .subscribe()
    }

    // 2. Local/Hybrid Mode Event Broadcaster
    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail && customEvent.detail.type === 'regularization_request') {
        if (onPetitionUpdate) {
          onPetitionUpdate(customEvent.detail.payload as RegularizationRequest)
        }
      } else if (customEvent.detail && customEvent.detail.type === 'announcement') {
        if (onAnnouncement) {
          onAnnouncement(customEvent.detail.payload as RealtimeAnnouncement)
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('amisphere_realtime_broadcast', handleStorageChange)
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('amisphere_realtime_broadcast', handleStorageChange)
      }
    }
  }, [onPetitionUpdate, onAnnouncement])
}

// Helper for emitting local broadcasts during demo/offline mode
export function broadcastRealtimeEvent(type: 'regularization_request' | 'announcement', payload: any) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('amisphere_realtime_broadcast', {
        detail: { type, payload },
      })
    )
  }
}
