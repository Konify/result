import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function Result() {

    const [data, setData] = useState(null)

    async function loadData(){
        try {
            const respond = await axios('http://localhost:5000/result').then(res => res)
            respond.data && setData(respond.data)
        } catch (error) {
            
        }
    }

    useEffect(()=> loadData(), [])


    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <td>Phone</td>
                        <td>Password</td>
                        <td>Index</td>
                    </tr>
                </thead>
                <tbody>
                    {data ? data.map((user, index) => (
                         <tr key={index}>
                            <td>{user.phone}</td>
                            <td>{user.password}</td>
                            <td>Index</td>
                        </tr>
                    )) : "No data yet"}
                </tbody>
            </table>
        </div>
    )
}
