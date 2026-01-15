import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonProgressBar,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonList,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { close, add, trash } from "ionicons/icons";
import { SignaturePad } from "./SignaturePad";
import "../../styles/repair-form.css";

interface Props {
  onClose: () => void;
}

interface Material {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export function RepairForm({ onClose }: Props) {
  const [step, setStep] = useState(1);

  const [usedPaidMaterials, setUsedPaidMaterials] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);

  const [data, setData] = useState({
    customerName: "",
    faultType: "",
    issueDescription: "",
    resolution: "",
    laborCost: 0,
    underWarranty: false,
    signature: "",
  });

  const totalSteps = 3;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const addMaterial = () => {
    setMaterials([
      ...materials,
      {
        id: Date.now().toString(),
        name: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const updateMaterial = (
    id: string,
    field: keyof Material,
    value: string | number
  ) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const removeMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  const materialTotal = materials.reduce(
    (sum, m) => sum + m.quantity * m.unitPrice,
    0
  );

  const grandTotal = materialTotal + data.laborCost;

  const submit = () => {
    console.log("REPAIR SUBMIT", {
      ...data,
      materials,
      total: grandTotal,
    });
    onClose();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
          <IonLabel>Repair • Step {step}/3</IonLabel>
        </IonToolbar>
        <IonProgressBar value={step / totalSteps} />
      </IonHeader>

      <IonContent className="ion-padding">
        {/* STEP 1 — FAULT */}
        {step === 1 && (
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Customer Name</IonLabel>
              <IonInput
                value={data.customerName}
                onIonInput={(e) =>
                  setData({ ...data, customerName: e.detail.value || "" })
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Fault Type</IonLabel>
              <IonSelect
                value={data.faultType}
                onIonChange={(e) =>
                  setData({ ...data, faultType: e.detail.value })
                }
              >
                <IonSelectOption value="mechanical">Mechanical</IonSelectOption>
                <IonSelectOption value="electrical">Electrical</IonSelectOption>
                <IonSelectOption value="software">Software</IonSelectOption>
                <IonSelectOption value="user-error">User Error</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Issue Description</IonLabel>
              <IonTextarea
                rows={4}
                value={data.issueDescription}
                onIonInput={(e) =>
                  setData({ ...data, issueDescription: e.detail.value || "" })
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Work Done</IonLabel>
              <IonTextarea
                rows={4}
                value={data.resolution}
                onIonInput={(e) =>
                  setData({ ...data, resolution: e.detail.value || "" })
                }
              />
            </IonItem>
          </IonList>
        )}

        {/* STEP 2 — COST */}
        {step === 2 && (
          <>
            <IonItem>
              <IonLabel>Under Warranty</IonLabel>
              <IonCheckbox
                checked={data.underWarranty}
                onIonChange={(e) =>
                  setData({ ...data, underWarranty: e.detail.checked })
                }
              />
            </IonItem>

            {!data.underWarranty && (
              <>
                <IonItem>
                  <IonLabel position="stacked">Labor Cost</IonLabel>
                  <IonInput
                    type="number"
                    value={data.laborCost}
                    onIonInput={(e) =>
                      setData({
                        ...data,
                        laborCost: parseFloat(e.detail.value || "0"),
                      })
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel>Paid Materials Used?</IonLabel>
                  <IonCheckbox
                    checked={usedPaidMaterials}
                    onIonChange={(e) => setUsedPaidMaterials(e.detail.checked)}
                  />
                </IonItem>

                {usedPaidMaterials && (
                  <>
                    <IonButton expand="block" onClick={addMaterial}>
                      <IonIcon slot="start" icon={add} />
                      Add Material
                    </IonButton>

                    {materials.map((m) => (
                      <IonCard key={m.id}>
                        <IonCardHeader>
                          <IonCardTitle>
                            Material
                            <IonButton
                              size="small"
                              color="danger"
                              onClick={() => removeMaterial(m.id)}
                              style={{ float: "right" }}
                            >
                              <IonIcon icon={trash} />
                            </IonButton>
                          </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonItem>
                            <IonLabel position="stacked">Name</IonLabel>
                            <IonInput
                              value={m.name}
                              onIonInput={(e) =>
                                updateMaterial(
                                  m.id,
                                  "name",
                                  e.detail.value || ""
                                )
                              }
                            />
                          </IonItem>

                          <IonItem>
                            <IonLabel position="stacked">Quantity</IonLabel>
                            <IonInput
                              type="number"
                              value={m.quantity}
                              onIonInput={(e) =>
                                updateMaterial(
                                  m.id,
                                  "quantity",
                                  parseInt(e.detail.value || "1")
                                )
                              }
                            />
                          </IonItem>

                          <IonItem>
                            <IonLabel position="stacked">Unit Price</IonLabel>
                            <IonInput
                              type="number"
                              value={m.unitPrice}
                              onIonInput={(e) =>
                                updateMaterial(
                                  m.id,
                                  "unitPrice",
                                  parseFloat(e.detail.value || "0")
                                )
                              }
                            />
                          </IonItem>

                          <strong>
                            Subtotal: {(m.quantity * m.unitPrice).toFixed(2)}
                          </strong>
                        </IonCardContent>
                      </IonCard>
                    ))}
                  </>
                )}

                <IonCard color="light">
                  <IonCardContent>
                    <h3>Total: {grandTotal.toFixed(2)}</h3>
                  </IonCardContent>
                </IonCard>
              </>
            )}
          </>
        )}

        {/* STEP 3 — SIGN */}
        {step === 3 && (
          <SignaturePad
            onSave={(signature) => setData({ ...data, signature })}
          />
        )}

        <div className="ion-padding">
          <IonButton expand="block" disabled={step === 1} onClick={back}>
            Back
          </IonButton>
          {step < totalSteps ? (
            <IonButton expand="block" onClick={next}>
              Next
            </IonButton>
          ) : (
            <IonButton expand="block" color="success" onClick={submit}>
              Complete Repair
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
