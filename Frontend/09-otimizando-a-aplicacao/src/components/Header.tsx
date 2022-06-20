import { memo } from "react"

interface HeaderProps {
  title: string;
}

export function HeaderComponent({ title }: HeaderProps) {
  return (
    <span className="category">Categoria:<span> {title}</span></span>

  )
}

export const Header = memo(HeaderComponent)