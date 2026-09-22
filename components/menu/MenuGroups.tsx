import type { MenuGroup } from '@/lib/schemas/menu';
import { Card } from '@/components/ui/Card';
import { MenuItemCard } from './MenuItemCard';

type MenuGroupsProps = {
  groups: MenuGroup[];
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
};

export function MenuGroups({ groups, selectedItemId, onSelectItem }: MenuGroupsProps) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <Card key={group.id} eyebrow={group.name} title="Menu category" className="overflow-hidden">
          <div className="space-y-4">
            {group.items.map((item) => (
              <MenuItemCard key={item.id} item={item} selected={selectedItemId === item.id} onSelect={onSelectItem} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}