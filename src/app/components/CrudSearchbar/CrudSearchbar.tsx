import { IonSearchbar, IonButton, IonIcon } from "@ionic/react";
import { add, filterOutline } from "ionicons/icons";
import "./styles.css";

export type Props = {
  placeholder?: string;
  onAdd?: () => void;
  onFilter?: () => void;
  onSearch?: (value: string) => void;
};

export function CrudSearchbar({
  placeholder = "Search",
  onAdd,
  onFilter,
  onSearch,
}: Props) {
  return (
    <div className="crud-search-root">
      <IonSearchbar
        class="crud-search"
        placeholder={placeholder}
        showClearButton="never"
        onIonInput={(e) => onSearch?.(e.detail.value ?? "")}
      />

      <IonButton fill="clear" onClick={onFilter} color="dark">
        <IonIcon icon={filterOutline} slot="icon-only" />
      </IonButton>

      <IonButton fill="clear" onClick={onAdd} color="dark">
        <IonIcon icon={add} slot="icon-only" />
      </IonButton>
    </div>
  );
}
