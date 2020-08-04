import React, {Component} from 'react';
import {getCreatorFundingDetails} from '../../eth/interaction'
import CardList from "../common/CardList";

class CreatorFundingTab extends Component {

    state = {
        creatorFundingDetails: [],
    }

    async componentWillMount() {
        //funding地址的数组
        let creatorFundingDetails = await getCreatorFundingDetails()
        console.table(creatorFundingDetails)


        this.setState({
            creatorFundingDetails
        })
    }

    render() {
        return (
            <CardList details={this.state.creatorFundingDetails}/>
        )
    }
}

export default CreatorFundingTab
