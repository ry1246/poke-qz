import { useCallback, useEffect, useState } from 'react'
import { fetchStatsQuiz } from '../api/pokeapi'
import type { StatsQuiz } from '../api/pokeapi'

// クイズ1問分の状態と操作をまとめて返す
export function useQuiz() {
  const [quiz, setQuiz] = useState<StatsQuiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // 1問読み込む
  const loadQuiz = useCallback(async () => {
    setLoading(true)
    setError(null)
    setSelectedId(null)
    try {
      setQuiz(await fetchStatsQuiz())
    } catch (e) {
      setError(e instanceof Error ? e.message : '取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [])

  // マウント時に1問目を読み込む
  useEffect(() => {
    let ignore = false
    ;(async () => {
      try {
        const q = await fetchStatsQuiz()
        if (!ignore) setQuiz(q)
      } catch (e) {
        if (!ignore) setError(e instanceof Error ? e.message : '取得に失敗しました')
      } finally {
        if (!ignore) setLoading(false)
      }
    })()
    return () => { ignore = true }
  }, [])

  // 派生値もここで計算
  const answered = selectedId !== null
  const isCorrect = quiz !== null && selectedId === quiz.answer.id

  return { quiz, loading, error, selectedId, answered, isCorrect, loadQuiz, setSelectedId }
}
