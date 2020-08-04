import {fundingFactoryInstance, newFundingInstance} from './instance'

let getCreatorFundingDetails = async () => {

    let creatorFundings = await fundingFactoryInstance.methods.getCreatorFundings().call()

    let detailsPromises = creatorFundings.map(function (fundingAddress) {
        console.log(fundingAddress)
        //1. 把Funding实例拿过来

        return new Promise(async (resolve, reject) => {
            //2. 对实例进行填充地址，可以使用了
            //这个instance是只有一个，后面的地址把前面的地址覆盖了，导致每次只能获取到最后一个合约的详情
            //解决办法：每一个地址来的时候，都创建一个新的合约实例。
            // fundingInstance.options.address = fundingAddress
            try {
                let newInstance = newFundingInstance()
                newInstance.options.address = fundingAddress


                //3. 调用方法，返回funding合约的详情
                let manager = await newInstance.methods.manager().call()
                let projectName = await newInstance.methods.projectName().call()
                let targetMoney = await newInstance.methods.targetMoney().call()
                let supportMoney = await newInstance.methods.supportMoney().call()
                let leftTime = await newInstance.methods.getLeftTime().call()

                let detail = {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime}
                // console.table(detail)
                console.log('00000000')
                resolve(detail)
            } catch (e) {
                reject(e)
            }
        })
    })

    console.log('11111111111')
    console.log('details:', detailsPromises)

    //把多个promise处理成一个promise
    let detailInfo = Promise.all(detailsPromises)

    return detailInfo
}

export {
    getCreatorFundingDetails,
}
