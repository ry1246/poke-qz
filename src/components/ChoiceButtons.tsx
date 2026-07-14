import type { Pokemon } from '../types/pokemon'

type Props = {
  choices: Pokemon[]
  answered: boolean
  onSelect: (id: number) => void
}

// 4択ボタン。回答後はdisabledへ
function ChoiceButtons({ choices, answered, onSelect }: Props) {
  return (
    <div className="choices">
      {choices.map((p) => (
        <button
          key={p.id}
          className="choice"
          onClick={() => onSelect(p.id)}
          disabled={answered}
        >
          {p.name}
        </button>
      ))}
    </div>
  )
}

export default ChoiceButtons
