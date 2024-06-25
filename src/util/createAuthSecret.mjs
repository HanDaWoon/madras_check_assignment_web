import fs from 'fs'

const configFilePath = "./.env"
const logPrefix = '[CreateAuthSecret]'

function createConfigFile() {
    try {
        fs.writeFileSync(configFilePath, `AUTH_SECRET=${Math.random().toString(36).substring(2, 15)}`)

        return true
    } catch (err) {
        console.error(logPrefix, `Error occured while writing the config file ${configFilePath}!`, err)
    }
}

const createdConfigFile = createConfigFile()

if (!createdConfigFile) {
    console.log(logPrefix, `No config file has been created. Stopping script!`)
    process.exit(1)
}

console.log(logPrefix, `File ${configFilePath} has been created successfuly! Happy deploying!`)
