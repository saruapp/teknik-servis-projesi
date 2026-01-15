import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import { home, construct, build, settings } from "ionicons/icons";

import { Home } from "./components/Home";
import { Settings } from "./components/Settings";
import "../styles/global.css";
import { RequestsPage } from "./components/RequestPage";
import DocumentsPage from "./components/DocumentsPage";

setupIonicReact({
  mode: "ios", // or 'md' for Material Design
});

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/request">
              <RequestsPage />
            </Route>
            <Route exact path="/documents">
              <DocumentsPage />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="installations" href="/request">
              <IonIcon icon={construct} />
              <IonLabel>Requests</IonLabel>
            </IonTabButton>
            <IonTabButton tab="repairs" href="/documents">
              <IonIcon icon={build} />
              <IonLabel>Documents</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
