export const BUY_CADENCE = `
 import FlowToken from 0xf233dcee88fe0abe
          import FungibleToken from 0x1d7e57aa55817448
          import Crowdflix from 0xad9300d3ca41f63a
          import CrowdflixMarket from 0x5a35c571a4feae1e

          transaction(sellerAddress: Address, tokenID: UInt64, purchaseAmount: UFix64) {
              prepare(acct: auth(BorrowValue) &Account) {

                  let collection = acct.storage.borrow<&Crowdflix.Collection>(from: /storage/MomentCollection)
                      ?? panic("Could not borrow reference to the Moment Collection")

                  let provider = acct.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(from: /storage/flowTokenVault)
                      ?? panic("No FlowToken vault in storage")
                  
                  let tokens <- provider.withdraw(amount: purchaseAmount) as! @FlowToken.Vault

                  let seller = getAccount(sellerAddress)

                  let crowdflixSaleCollection = seller.capabilities.borrow<&CrowdflixMarket.SaleCollection>(/public/CrowdflixMarketCollection)
                      ?? panic("Could not borrow public sale reference")
              
                  let purchasedToken <- crowdflixSaleCollection.purchase(tokenID: tokenID, buyTokens: <-tokens)

                  collection.deposit(token: <-purchasedToken)
              }
          }

`;

export const PREPARE_SELL_CADENCE = `
    import FungibleToken from 0xf233dcee88fe0abe
          import NonFungibleToken from 0x1d7e57aa55817448
          import Crowdflix from 0xad9300d3ca41f63a
          import CrowdflixMarket from 0x5a35c571a4feae1e

          transaction {
              prepare(acct: auth(Storage, Capabilities) &Account) {
                  let TOKEN_RECEIVER_PATH: PublicPath = /public/flowTokenReceiver
                  let BENEFICIARY_ACCOUNT: Address = 0x474b92dbf17fda56
                  let CUT_PERCENTAGE: UFix64 = 0.05
                  let ownerCapability = acct.capabilities
                      .get<&{FungibleToken.Receiver}>(TOKEN_RECEIVER_PATH)!
                  
                  let beneficiaryCapability = getAccount(BENEFICIARY_ACCOUNT)
                      .capabilities
                      .get<&{FungibleToken.Receiver}>(TOKEN_RECEIVER_PATH)!

                  let ownerCollection = acct.capabilities
                      .storage
                      .issue<auth(NonFungibleToken.Withdraw, NonFungibleToken.Update) &Crowdflix.Collection>(
                          /storage/MomentCollection
                      )

                  let collection <- CrowdflixMarket.createSaleCollection(
                      ownerCollection: ownerCollection,
                      ownerCapability: ownerCapability,
                      beneficiaryCapability: beneficiaryCapability,
                      cutPercentage: CUT_PERCENTAGE
                  )
                  
                  acct.storage.save(<-collection, to: CrowdflixMarket.marketStoragePath)

                  acct.capabilities.publish(
                      acct.capabilities
                          .storage
                          .issue<&CrowdflixMarket.SaleCollection>(
                              CrowdflixMarket.marketStoragePath
                          ),
                      at: CrowdflixMarket.marketPublicPath
                  )
              }
          }`;
export const PREPARE_BUY_CADENCE = `
      import Crowdflix from 0xad9300d3ca41f63a

      transaction {
        prepare(acct: auth(Storage, Capabilities) &Account) {
          if acct.storage.borrow<&Crowdflix.Collection>(from: /storage/MomentCollection) == nil {
            let collection <- Crowdflix.createEmptyCollection(nftType: Type<@Crowdflix.NFT>()) as! @Crowdflix.Collection
            acct.storage.save(<-collection, to: /storage/MomentCollection)
          }
          acct.capabilities.unpublish(/public/MomentCollection)
          acct.capabilities.publish(
            acct.capabilities.storage.issue<&Crowdflix.Collection>(/storage/MomentCollection),
            at: /public/MomentCollection
          )
        }
      }`;

export const SELL_CADENCE = `
import Crowdflix from 0xf233dcee88fe0abe
import CrowdflixMarket from 0x5a35c571a4feae1e


transaction(momentID: UInt64, price: UFix64) {
  prepare(acct: auth(Storage, Capabilities, BorrowValue) &Account) {
    let storagePath = /storage/CrowdflixMarketCollection
    let publicPath  = /public/CrowdflixMarketCollection

    let saleRef = acct.storage
      .borrow<&CrowdflixMarket.SaleCollection>(from: storagePath)
      ?? panic("SaleCollection not found in storage. Run your market setup transaction first.")

    acct.capabilities.unpublish(publicPath)
    acct.capabilities.publish(
      acct.capabilities.storage.issue<&CrowdflixMarket.SaleCollection>(storagePath),
      at: publicPath
    )

    saleRef.listForSale(tokenID: momentID, price: price)
  }
}

      `;

export const CANCEL_LISTING_CADENCE = `
      import Crowdflix from 0xad9300d3ca41f63a
import CrowdflixMarket from 0x5a35c571a4feae1e
transaction(tokenID: UInt64) {
    prepare(acct: auth(BorrowValue) &Account) {
        if let crowdflixCollection = acct.storage.borrow<&CrowdflixMarket.SaleCollection>(from: CrowdflixMarket.marketStoragePath) {
            crowdflixCollection.cancelSale(tokenID: tokenID)
        }
    }
}
      `;

export const EDIT_PRICE_LISTING_CADENCE = `
      import Crowdflix from 0xad9300d3ca41f63a
import CrowdflixMarket from 0x5a35c571a4feae1e
transaction(tokenID: UInt64, newPrice: UFix64) {
    prepare(acct: auth(Storage, Capabilities) &Account) {
        let crowdflixSaleCollection = acct.storage.borrow<&CrowdflixMarket.SaleCollection>(from: CrowdflixMarket.marketStoragePath)
            ?? panic("Could not borrow from sale in storage")
        crowdflixSaleCollection.listForSale(tokenID: tokenID, price: newPrice)
    }
}

      `;
