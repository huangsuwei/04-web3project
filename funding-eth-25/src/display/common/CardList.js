import React from 'react'
import {Card} from 'semantic-ui-react'

const src = '/images/daniel.jpg'

const CardList = (props) => {
    let details = props.details
    console.log('bbbbb :', details)

    let cards = details.map(detail => {

        return <Card key={detail.fundingAddress}/>
    })


    return (
        <Card.Group itemsPerRow={4}>
            {
                cards
            }
        </Card.Group>
    )
}

export default CardList
