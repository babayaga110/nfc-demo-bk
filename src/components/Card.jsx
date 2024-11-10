import * as React from 'react'
import Plus from '../assets/Plus'
import Delete from '../assets/Delete'

export default function Card() {
  return (
    <div className="flex w-[300px] border border-1">
    <img
      src="https://via.placeholder.com/150"
      alt="placeholder"
      className="object-cover"
    />
    <div className="flex flex-col w-full border-1">
      <button className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center flex-1">
        <Plus />
      </button>
      <button className="bg-red-500 hover:bg-red-700 text-white flex justify-center items-center flex-1">
        <Delete />
      </button>
    </div>
  </div>
  )
}
