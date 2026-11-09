interface Props {
  onClick: () => void
}

export default function ClickButton({ onClick }: Props) {
  return (
    <button className="click-button" onClick={onClick}>
      Work (+$1)
    </button>
  )
}
