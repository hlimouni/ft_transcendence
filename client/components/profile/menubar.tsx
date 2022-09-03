import React from 'react'

type Props = {}

const MenuBar = (props: Props) => {
  return (
    <div>
        <ul>
            <li><a href='#'>Profile</a></li>
            <li><a href='#'>Friends</a></li>
            <li><a href='#'>History</a></li>
        </ul>
    </div>
  )
}

export default MenuBar