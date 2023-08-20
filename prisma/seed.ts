import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await hash('test', 12)

    const user = await prisma.user.upsert({
        where: { email: 'test@test.com"'},
        update: {},
        create: {
            email: 'eze@test.com', 
            name: 'Ezequiel',
            password,
            userRole: 'ADMIN'
        }
    })
    console.log({user})
}

main().then(() => prisma.$disconnect).catch(async (e) => {
    console.log('error', e)
    await prisma.$disconnect()
    process.exit(1)
})
