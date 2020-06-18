import React from 'react';

class Contact extends React.Component {
    render() {
        return (
            <div>
                <h1>Kontakt</h1>
                <br />
            <table>
                <tr>
                    <th>Telefon nummer</th>
                    <th>Email</th>
                    <th>Namn</th>
                </tr>
                <tr>
                    <th>1234567912</th>
                    <th>Jonas.Rosberg@hotmail.com</th>
                    <th>Jonas Rosberg</th>
                </tr>

            </table>
            </div>
        )
    }
}

export default Contact;