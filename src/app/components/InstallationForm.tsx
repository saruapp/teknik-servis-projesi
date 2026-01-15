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
} from "@ionic/react";
import { close, camera, barcode } from "ionicons/icons";
import { SignaturePad } from "./SignaturePad";

import "../../styles/installation-form.css";

interface Props {
  onClose: () => void;
}

export function InstallationForm({ onClose }: Props) {
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    customerName: "",
    phone: "",
    address: "",
    deviceType: "",
    brand: "",
    model: "",
    serialNumber: "",
    installationType: "first",
    electricalOk: false,
    tested: false,
    notes: "",
    signature: "",
  });

  const totalSteps = 3;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    console.log("INSTALLATION SUBMIT", data);
    onClose();
  };

  const scanBarcode = () => {
    setData({
      ...data,
      serialNumber: "SN-" + Math.random().toString(36).substring(2, 10),
    });
  };

  return (
    <IonPage className="installation-page">
      <IonHeader className="installation-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
          <IonLabel>
            Installation • Step {step}/{totalSteps}
          </IonLabel>
        </IonToolbar>
        <IonProgressBar value={step / totalSteps} />
      </IonHeader>

      <IonContent className="ion-padding">
        {/* STEP 1 — CUSTOMER & DEVICE */}
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
              <IonLabel position="stacked">Phone</IonLabel>
              <IonInput
                type="tel"
                value={data.phone}
                onIonInput={(e) =>
                  setData({ ...data, phone: e.detail.value || "" })
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Device Type</IonLabel>
              <IonSelect
                value={data.deviceType}
                onIonChange={(e) =>
                  setData({ ...data, deviceType: e.detail.value })
                }
              >
                <IonSelectOption value="washer">
                  Washing Machine
                </IonSelectOption>
                <IonSelectOption value="fridge">Refrigerator</IonSelectOption>
                <IonSelectOption value="dishwasher">Dishwasher</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Brand / Model</IonLabel>
              <IonInput
                value={data.brand}
                placeholder="Brand"
                onIonInput={(e) =>
                  setData({ ...data, brand: e.detail.value || "" })
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Serial / Barcode</IonLabel>
              <IonInput value={data.serialNumber} readonly />
            </IonItem>

            <IonButton expand="block" onClick={scanBarcode}>
              <IonIcon slot="start" icon={barcode} />
              Scan Barcode
            </IonButton>
          </IonList>
        )}

        {/* STEP 2 — INSTALLATION */}
        {step === 2 && (
          <IonList>
            <IonItem>
              <IonLabel>Installation Type</IonLabel>
              <IonSelect
                value={data.installationType}
                onIonChange={(e) =>
                  setData({ ...data, installationType: e.detail.value })
                }
              >
                <IonSelectOption value="first">
                  First Installation
                </IonSelectOption>
                <IonSelectOption value="relocation">Relocation</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Electrical / Plumbing OK</IonLabel>
              <IonCheckbox
                checked={data.electricalOk}
                onIonChange={(e) =>
                  setData({ ...data, electricalOk: e.detail.checked })
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel>Tested Successfully</IonLabel>
              <IonCheckbox
                checked={data.tested}
                onIonChange={(e) =>
                  setData({ ...data, tested: e.detail.checked })
                }
              />
            </IonItem>

            <IonButton expand="block" color="medium">
              <IonIcon slot="start" icon={camera} />
              Take Photos
            </IonButton>
          </IonList>
        )}

        {/* STEP 3 — SIGNATURE */}
        {step === 3 && (
          <>
            <IonItem>
              <IonLabel position="stacked">Notes</IonLabel>
              <IonTextarea
                rows={4}
                value={data.notes}
                onIonInput={(e) =>
                  setData({ ...data, notes: e.detail.value || "" })
                }
              />
            </IonItem>

            <SignaturePad
              onSave={(signature) => setData({ ...data, signature })}
            />
          </>
        )}

        {/* ACTIONS */}
        <div className="ion-padding">
          <IonButton expand="block" disabled={step === 1} onClick={back}>
            Back
          </IonButton>

          {step < totalSteps ? (
            <IonButton expand="block" onClick={next}>
              Next
            </IonButton>
          ) : (
            <IonButton expand="block" color="success" onClick={handleSubmit}>
              Complete Installation
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
