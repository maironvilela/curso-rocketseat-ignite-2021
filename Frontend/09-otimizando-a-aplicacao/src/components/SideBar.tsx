import { memo } from "react";
import { Button } from "./Button";

type Genres = {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface SideBarProps {
  genres: Genres[];
  selectedGenreId: number;
  handleClickButton(id: number): void;
}

export function SideBarComponent({ genres, selectedGenreId, handleClickButton }: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />

        ))}
      </div>
    </nav>
  )
}

export const SideBar = memo(SideBarComponent)