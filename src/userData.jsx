import React from 'react'

const UserData = ({users}) => {
  return (
    <>
        {
            users.map((currUser)=>{
                const {full,short}=currUser;
                return(
                    <tr key={currUser.id}>
                        <td>{full}</td>
                        <td>{short}</td>
                    </tr>
                )
            })
        }
    </>
  )
}

export default UserData