import Home from '../views/Home';

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: 'Probabilidad RCP' },
  },
  {
    path: "/login",
    name: "login",
    meta: { title: 'Iniciar sesion' },
    component: () => import(/* webpackChunkName: "Login" */ "../views/Login"),
  },
  {
    path: "/registration",
    name: "registration",
    meta: { title: 'Registro' },
    component: () => import(/* webpackChunkName: "Registration" */ "../views/Registration"),
  },
  {
    path: "/about",
    name: "about",
    meta: { title: 'Proyecto' },
    component: () => import(/* webpackChunkName: "About" */ "../views/About"),
  },
  {
    path: "/contact",
    name: "contact",
    meta: { title: 'Contacto' },
    component: () => import(/* webpackChunkName: "Contact" */ "../views/Contact"),
  },
  {
    path: "/medical-record/:uuid?",
    name: "medicalRecord",
    props: true,
    meta: { title: 'Expediente' },
    component: () => import(/* webpackChunkName: "MedicalRecord" */ "../views/MedicalRecord"),
    children: [
      {
        path: "vitals",
        name: "vitals",
        meta: { title: 'Signos Vitales', back: true },
        component: () => import(/* webpackChunkName: "Vitals" */ "../views/Vitals"),
      },
      {
        path: "triage",
        name: "triage",
        meta: { title: 'Triage', back: true },
        component: () => import(/* webpackChunkName: "Triage" */ "../views/Triage"),
      },
      {
        path: "covid",
        name: "covid",
        meta: { title: 'Covid', back: true },
        component: () => import(/* webpackChunkName: "Covid" */ "../views/Covid"),
      },
      {
        path: "probability",
        name: "probability",
        meta: { title: 'Probability', back: true },
        component: () => import(/* webpackChunkName: "Probability" */ "../views/Probability"),
      },
      {
        path: "laboratorios",
        name: "labs",
        meta: { title: 'Laboratorios', back: true },
        component: () => import(/* webpackChunkName: "Laboratorios" */ "../views/Laboratorios"),
      },
      {
        path: "medical-notes",
        name: "notes",
        meta: { title: 'Notas Medicas' },
        component: () => import(/* webpackChunkName: "Notes" */ "../views/Notes"),
      },
    ]
  },
  {
    path: "/medical-records-list",
    name: "medicalRecords",
    meta: { title: 'Listado de Pacientes' },
    component: () => import(/* webpackChunkName: "MedicalRecords" */ "../views/MedicalRecordList"),
  },
  {
    path: "/non-suspicious",
    name: "non-suspicious",
    meta: { title: 'No Sospechoso' },
    component: () => import(/* webpackChunkName: "NonSuspicious" */ "../views/NonSuspicious"),
  },
  {
    path: "/404",
    alias: "*",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound"),
  },
];

export default routes;
