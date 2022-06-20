
interface HeaderProps{
  title: string;
}

export function Header({title}: HeaderProps) {
  return(
    <span className="category">Categoria:<span> {title}</span></span>

  )
}