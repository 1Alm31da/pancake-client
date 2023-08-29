import React from 'react'
import "./steps.css"

export default function Steps() {
  return (
    <div className='main-steps'>
        <div>
            <p>4. Pagamento</p>
        </div>
        <div>
            <p>3. Envio</p>
        </div>
        <div>
            <p>2. Identificação</p>
        </div>
        <div>
            <p className='on-step'>1. Lugares</p>
        </div>
    </div>
  )
}
