import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Types and interfaces
interface Card {
  id: number;
  text: string;
}

interface DraggableCardProps {
  id: number;
  text: string;
  index: number;
  moveCard: (fromIndex: number, toIndex: number) => void;
}

interface DragItem {
  id: number;
  index: number;
  type: string;
}

// Card component that can be dragged
const DraggableCard: React.FC<DraggableCardProps> = ({ id, text, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: 'CARD',
    item: { id, index, type: 'CARD' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const [, drop] = useDrop<DragItem, void, {}>({
    accept: 'CARD',
    hover: (item: DragItem) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-4 mb-2 rounded-lg shadow-md cursor-move transition-all
        ${isDragging ? 'opacity-50 bg-gray-100' : 'bg-white'}
        hover:shadow-lg border border-gray-200`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      data-testid={`card-${id}`}
    >
      {text}
    </div>
  );
};

// Main component
const DraggableCards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, text: 'Card 1' },
    { id: 2, text: 'Card 2' },
    { id: 3, text: 'Card 3' },
    { id: 4, text: 'Card 4' },
  ]);

  const moveCard = (fromIndex: number, toIndex: number): void => {
    const newCards = [...cards];
    const [movedCard] = newCards.splice(fromIndex, 1);
    newCards.splice(toIndex, 0, movedCard);
    setCards(newCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Draggable Cards</h2>
        <div className="space-y-2">
          {cards.map((card, index) => (
            <DraggableCard
              key={card.id}
              id={card.id}
              text={card.text}
              index={index}
              moveCard={moveCard}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default DraggableCards;