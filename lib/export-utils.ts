'use client'

/**
 * Exports tabular array data to a downloadable CSV file with a UTF-8 BOM (\uFEFF)
 * so that Microsoft Excel, Apple Numbers, and Google Sheets render all Classical/Unicode characters accurately.
 */
export function exportToCSV(data: Record<string, any>[], filename: string) {
  if (!data || !data.length) {
    console.warn('No data available to export.')
    return
  }

  const headers = Object.keys(data[0])
  
  const csvRows = [
    // Header row
    headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(','),
    ...data.map(row =>
      headers.map(fieldName => {
        const value = row[fieldName] === null || row[fieldName] === undefined ? '' : row[fieldName]
        return `"${String(value).replace(/"/g, '""')}"`
      }).join(',')
    )
  ]

  const csvString = '\uFEFF' + csvRows.join('\r\n')
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  
  if (typeof window !== 'undefined') {
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}
