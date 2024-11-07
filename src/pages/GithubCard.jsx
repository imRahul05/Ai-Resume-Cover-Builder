'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FetchGitHubData } from '@/utils/api'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Github, Users, BookOpen, Code, Star } from 'lucide-react'

export default function GitHubCard() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await FetchGitHubData(username)
      setUserData(data)
    } catch (error) {
      console.error('Error fetching GitHub data:', error)
      setError('Failed to fetch user data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-6">
      <div className="mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          {!userData ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-bold text-white text-center">GitHub Explorer</h1>
              <div className="flex items-center space-x-4">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-700 text-white placeholder-gray-400"
                  placeholder="Enter GitHub username"
                />
                <Button onClick={handleFetchData} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
                  {loading ? 'Loading...' : 'Generate'}
                </Button>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Card className="bg-gray-800 text-white overflow-hidden">
                <CardHeader className="relative">
                  <motion.img
                    src={userData.avatar_url}
                    alt={userData.login}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                  />
                  <CardTitle className="text-2xl font-bold text-center mt-4">{userData.name || userData.login}</CardTitle>
                  <p className="text-gray-400 text-center">@{userData.login}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-center text-gray-300">{userData.bio}</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <Users className="inline-block mr-2" />
                      <span className="font-bold">{userData.followers}</span>
                      <p className="text-sm text-gray-400">Followers</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <Users className="inline-block mr-2" />
                      <span className="font-bold">{userData.following}</span>
                      <p className="text-sm text-gray-400">Following</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <BookOpen className="inline-block mr-2" />
                      <span className="font-bold">{userData.public_repos}</span>
                      <p className="text-sm text-gray-400">Repositories</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <Code className="inline-block mr-2" />
                      <span className="font-bold">{userData.public_gists}</span>
                      <p className="text-sm text-gray-400">Gists</p>
                    </div>
                  </div>
                  {userData.top_repos && (
                    <div>
                      <h3 className="text-xl font-bold mb-2">Top Repositories</h3>
                      <ul className="space-y-2">
                        {userData.top_repos.map((repo) => (
                          <motion.li
                            key={repo.id}
                            className="bg-gray-700 p-2 rounded-lg flex justify-between items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <span>{repo.name}</span>
                            <span className="flex items-center">
                              <Star className="inline-block mr-1 h-4 w-4" />
                              {repo.stargazers_count}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="justify-between">
                  <Button asChild variant="outline">
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                      View on GitHub
                    </a>
                  </Button>
                  <Button onClick={() => setUserData(null)} variant="ghost">
                    New Search
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}