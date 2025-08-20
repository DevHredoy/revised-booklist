import bcrypt from 'bcryptjs'
import fs from 'fs'

interface DatabaseData {
  users: User[]
  books: Book[]
}

const DB_FILE = './database.json'
let db: DatabaseData | null = null

export function getDatabase(): DatabaseData {
  if (!db) {
    // Try to load existing database
    if (fs.existsSync(DB_FILE)) {
      try {
        const data = fs.readFileSync(DB_FILE, 'utf8')
        db = JSON.parse(data)
      } catch (error) {
        console.error('Error reading database file:', error)
        db = { users: [], books: [] }
      }
    } else {
      db = { users: [], books: [] }
    }

    // Insert default users if they don't exist
    if (db && db.users.length === 0) {
      const defaultUsers = [
        { username: 'demo', password: 'password123' },
        { username: 'alice', password: 'alicepass' },
        { username: 'bob', password: 'bobpass' }
      ]

      for (const user of defaultUsers) {
        const hashedPassword = bcrypt.hashSync(user.password, 10)
        db.users.push({
          id: db.users.length + 1,
          username: user.username,
          password_hash: hashedPassword,
          created_at: new Date().toISOString()
        })
      }

      saveDatabase()
    }
  }

  return db!
}

export function saveDatabase() {
  if (db) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
    } catch (error) {
      console.error('Error saving database:', error)
    }
  }
}

export interface User {
  id: number
  username: string
  password_hash: string
  created_at: string
}

export interface Book {
  id: number
  user_id: number
  title: string
  author: string
  description?: string
  created_at: string
}

export async function createUser(username: string, password: string): Promise<User | null> {
  try {
    const db = getDatabase()
    const hashedPassword = await bcrypt.hash(password, 10)

    // Check if user already exists
    const existingUser = db.users.find(u => u.username === username)
    if (existingUser) {
      return null
    }

    const newUser: User = {
      id: Math.max(...db.users.map(u => u.id), 0) + 1,
      username,
      password_hash: hashedPassword,
      created_at: new Date().toISOString()
    }

    db.users.push(newUser)
    saveDatabase()
    return newUser
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

export async function findUserByUsername(username: string): Promise<User | null> {
  try {
    const db = getDatabase()
    const user = db.users.find(u => u.username === username)
    return user || null
  } catch (error) {
    console.error('Error finding user:', error)
    return null
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
