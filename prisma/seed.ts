import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'cikizwa@ndzimela.com' },
    update: {},
    create: {
      email: 'cikizwa@ndzimela.com',
      password: hashedPassword,
      name: 'Cikizwa Ndzimela',
    },
  })
  
  // Seed some properties if they don't exist
  const count = await prisma.property.count()
  if (count === 0) {
    await prisma.property.createMany({
      data: [
        {
          title: 'The Metropolitan',
          location: 'Sandton Core, Johannesburg',
          imageUrl: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=800&auto=format&fit=crop',
          description: 'A prime A-grade commercial space in the heart of Sandton.',
          yieldRate: 8.5,
          featured: true
        },
        {
          title: 'Rosebank Towers',
          location: 'Rosebank, Johannesburg',
          imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
          description: 'Modern mixed-use development with high foot traffic.',
          yieldRate: 7.8,
          featured: true
        },
        {
          title: 'Waterfront Office Park',
          location: 'V&A Waterfront, Cape Town',
          imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
          description: 'Premium office space overlooking the marina.',
          yieldRate: 6.9,
          featured: true
        }
      ]
    })
  }
  
  console.log('Seeded database!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
