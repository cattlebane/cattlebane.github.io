// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import chalk from "chalk"
import { MongoClient } from "mongodb"

export default async function handler(req, res) {
  console.log('/api/projects')
  console.log(' » req.method:', req.method)
  if (req.method === 'GET') {
    // const databaseURL = 'mongodb+srv://portfoliouser:sUQ9mZ6BxZ1N6siA@cluster0.dby2t.mongodb.net/portfolio?retryWrites=true&w=majority'
    const databaseURL = 'mongodb+srv://portfoliouser:sUQ9mZ6BxZ1N6siA@cluster0.dby2t.mongodb.net/?retryWrites=true&w=majority'
    console.log(chalk.yellow('   » databaseURL:', databaseURL))
    try {

      const client = await MongoClient.connect(databaseURL)
      console.log(chalk.bgGreen('   » connected'))
      const db = client.db()
      
      const projectsCollection = db.collection('projects')
      console.log(' » projectsCollection:', projectsCollection)
      
      client.close()
      
      // res.status(200).json({message: 'projects recieved', projects: projectsCollection})
      res.status(200).json({message: 'projects recieved'})
    } catch {
      throw(chalk.red("Couldn't connect to DB"))
      res.status(500).json({message: "Couldn't connect to DB"})
    }
  }
  if (req.method === 'POST') {

  }
}
