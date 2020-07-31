import React from 'react'
import {Card, Icon, Image, Statistic} from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='/images/logo.jpg'/>
        <Card.Content>
            <Card.Header>黑马福利彩票（航头站）</Card.Header>
            <Card.Meta>
                <p>管理员地址: {props.manager}</p>
                <p>当前地址: {props.currentAccount}</p>
            </Card.Meta>
            <Card.Description>每晚八点准时开奖, 不见不散!</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user'/>
                {props.playersCounts} 人参与
            </a>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.balance}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <a href='#'>点击我查看交易历史</a>
            </Statistic>
        </Card.Content>

    </Card>
)

export default CardExampleCard
//import  es6
