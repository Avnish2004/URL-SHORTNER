import React from 'react'

const UserData = ({users}) => {
  return (
    <>
        {
            users.map((currUser)=>{
                const {full,short,description}=currUser;
                return(
                    <tr key={currUser.id}>
                        <td className="full">{full}</td>
                        <td>{short}</td>
                        <td>{description}</td>
                    </tr>
                )
            })
        }
    </>
  )
}

export default UserData