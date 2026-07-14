import type { ReactNode } from 'react'

type Props = {
  isCorrect: boolean
  answerName: string
  onNext: () => void

  children?: ReactNode  // クイズ固有の追加表示
}

// 結果表示 + 次へ
function QuizResult({ isCorrect, answerName, onNext, children }: Props) {
  return (
    <div className="result">
      <p className={isCorrect ? 'result_msg--correct' : 'result_msg--wrong'}>
        {isCorrect ? '正解' : `不正解...正解は ${answerName}`}
      </p>
      {children}
      <div>
        <button className="next-btn" onClick={onNext}>
          次へ
        </button>
      </div>
    </div>
  )
}

export default QuizResult
