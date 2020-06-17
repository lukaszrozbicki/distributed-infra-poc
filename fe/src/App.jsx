import React, { useEffect, useState } from "react"
import "./App.css"

const API_HOST = process.env.REACT_APP_API_HOST
const API_URL = `${API_HOST}/api`
const IFRAME_URL = `${API_HOST}/iframe`

function App() {
  const [data, setData] = useState([])
  const [dataFromIFrame, setDataFromIFrame] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL)
      const responseData = await response.json()

      setData(responseData)
    })()
  }, [])

  useEffect(() => {
    const messageListener = (event) => {
      const { data } = event

      if (event.origin === API_HOST) {
        setDataFromIFrame(data)
      }
    }

    window.addEventListener("message", messageListener)

    return () => {
      window.removeEventListener("message", messageListener)
    }
  }, [])

  return (
    <div className="App">
      <h1>Response from API:</h1>
      {data.map(item => (
        <div
          key={item.id}
        >
          {item.value}
        </div>
      ))}
      <h1>IFrame</h1>
      <iframe
        src={IFRAME_URL}
        style={{
          border: "solid 1px black",
          margin: "10% auto",
          width: "80%"
        }}
        title="PoC iframe"
      />
      <h1>IFrame results</h1>
      {dataFromIFrame && (
        <div>
          {JSON.stringify(dataFromIFrame)}
        </div>
      )}
    </div>
  )
}

export default App
