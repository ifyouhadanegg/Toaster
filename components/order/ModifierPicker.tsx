import type { MenuItem } from '@/lib/schemas/menu';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type ModifierPickerProps = {
  item: MenuItem;
  selectedModifiers: Record<string, string>;
  onSelectModifier: (groupId: string, optionId: string) => void;
};

export function ModifierPicker({ item, selectedModifiers, onSelectModifier }: ModifierPickerProps) {
  return (
    <div className="space-y-4">
      {item.modifierGroups.map((group) => (
        <Card key={group.id} title={group.label} eyebrow="Required modifier">
          {group.description ? <p className="mb-4 text-sm text-stone-600">{group.description}</p> : null}
          <div className="flex flex-wrap gap-3">
            {group.options.map((option) => {
              const selected = selectedModifiers[group.id] === option.id;

              return (
                <Button
                  key={option.id}
                  type="button"
                  variant={selected ? 'primary' : 'secondary'}
                  onClick={() => onSelectModifier(group.id, option.id)}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}