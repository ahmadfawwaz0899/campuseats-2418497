import { useState, useEffect } from 'react'

export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        // Note: We removed the `setSelectedVendorId` line here because 
        // in Lab 4, the selected vendor will be determined by the URL route (/vendor/:id) instead!
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  // A simple function to trigger the useEffect to run again
  function reload() {
    setReloadKey((k) => k + 1)
  }

  // Return the object exactly as requested by the Lab 4 sheet
  return { vendors, loading, error, reload }
}