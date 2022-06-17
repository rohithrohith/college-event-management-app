const { Builder, By, Key, Util } = require( 'selenium-webdriver' )



async function signInAndParticipate() {
    try {
        let driver = await new Builder().forBrowser( 'chrome' ).build()
        await driver.get( "http://localhost:3000/" )
        await driver.sleep( 500 )
        await driver.findElement( By.name( 'email' ) ).sendKeys( "sanjay@gmail.com" )
        await driver.sleep( 500 )
        await driver.findElement( By.name( 'password' ) ).sendKeys( "4321" )
        await driver.sleep( 500 )
        await driver.findElement( By.name( 'login-submit' ) ).click()
        await driver.sleep( 1000 )
        await driver.findElement( By.name( 'password' ) ).sendKeys( Key.BACK_SPACE )
        await driver.findElement( By.name( 'password' ) ).sendKeys( Key.BACK_SPACE )
        await driver.findElement( By.name( 'password' ) ).sendKeys( Key.BACK_SPACE )
        await driver.findElement( By.name( 'password' ) ).sendKeys( Key.BACK_SPACE )
        await driver.findElement( By.name( 'password' ) ).sendKeys( "1234" )
        await driver.findElement( By.name( 'login-submit' ) ).click()
        await driver.sleep( 20000 )
        await driver.findElement( By.partialLinkText( 'Read more' ) ).click()
        await driver.sleep( 20000 )
        await driver.findElement( By.className( 'event_register_btn__1Biw+' ) ).click()
        console.log( "Test Successful!" )
        await driver.sleep( 5000 )
        driver.quit()
    } catch ( err ) {
        console.log( "Test failed!" )
    }

}

signInAndParticipate()