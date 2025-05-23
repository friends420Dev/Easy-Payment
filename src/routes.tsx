import React, { LazyExoticComponent, FC, ReactNode } from 'react'
import { Translation } from 'react-i18next'

export type Route = {
  element?: LazyExoticComponent<FC>
  exact?: boolean
  name?: ReactNode
  path?: string
  routes?: Route[]
}

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const LoadingButtons = React.lazy(() => import('./views/buttons/loading-buttons/LoadingButtons'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const DatePicker = React.lazy(() => import('./views/forms/date-picker/DatePicker'))
const DateRangePicker = React.lazy(() => import('./views/forms/date-range-picker/DateRangePicker'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const MultiSelect = React.lazy(() => import('./views/forms/multi-select/MultiSelect'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const TimePicker = React.lazy(() => import('./views/forms/time-picker/TimePicker'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const SmartTable = React.lazy(() => import('./views/smart-table/SmartTable'))

// Plugins
const Calendar = React.lazy(() => import('./views/plugins/calendar/Calendar'))
const Charts = React.lazy(() => import('./views/plugins/charts/Charts'))
const GoogleMaps = React.lazy(() => import('./views/plugins/google-maps/GoogleMaps'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const Invoice = React.lazy(() => import('./views/apps/invoicing/Invoice'))



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


const Bank_statement = React.lazy(() => import('./views/bank-statement/index'))


const Deposit = React.lazy(() => import('./views/deposit/index'))
const Withdrawal = React.lazy(() => import('./views/withdrawal/index'))

// manual-transaction
const Slip = React.lazy(() => import('./views/manual-transaction/slip'))
const TransRef = React.lazy(() => import('./views/manual-transaction/trans-ref'))
const Manual = React.lazy(() => import('./views/manual-transaction/manual'))

const Manual_History = React.lazy(() => import('./views/manual-history-deposit/manual'))


const DashboardReport = React.lazy(() => import('./views/reports/dashboard-report'))
const DashboardReport_By_Merchant = React.lazy(() => import('./views/reports/dashboard-report-by-merchant'))
const ChartReport = React.lazy(() => import('./views/reports/chart-report'))
const ExportReport = React.lazy(() => import('./views/reports/export-report'))

// /money-transfer
const MoneyTransfer = React.lazy(() => import('./views/money-transfer/index'))
const CreateMoneyTransfer = React.lazy(() => import('./views/money-transfer/create-money-transfer'))


// bank-management
const BankAccounts = React.lazy(() => import('./views/bank-management/bank-accounts'))
const BankAccountsGroups = React.lazy(() => import('./views/bank-management/bank-account-groups'))

// Members
const Members = React.lazy(() => import('./views/members/index'))

const Users = React.lazy(() => import('./views/user-management/users'))
const History = React.lazy(() => import('./views/user-management/history'))
const editRoless = React.lazy(() => import('./views/user-management/role'))
const AddAdmin = React.lazy(() => import('./views/user-management/add-admin'))
const AddRole = React.lazy(() => import('./views/user-management/add-role'))
const addPermission = React.lazy(() => import('./views/user-management/add-permission'))
const Profile = React.lazy(() => import('./views/user-management/profile'))
const Activity = React.lazy(() => import('./views/activity/activity-report'))
const Instruction = React.lazy(() => import('./views/Instruction/index'))


const routes: Route[] = [
  { path: '/', exact: true, name: <Translation>{(t) => t('home')}</Translation> },
  // dashboard
  {
    path: '/dashboard',
    name: <Translation>{(t) => t('Bank account status')}</Translation>,
    element: Dashboard,
    exact: true,
  },

  // deposit
  {
    path: '/deposit/deposit_list',
    name: <Translation>{(t) => t('Deposit List')}</Translation>,
    element: Deposit,
    exact: true,
  },

  // withdrawal
  {
    path: '/withdrawal/withdrawal_list',
    name: <Translation>{(t) => t('Withdrawal List')}</Translation>,
    element: Withdrawal,
    exact: true,
  },

  // manual-transaction
  {
    path: '/manual-transaction/slip',
    name: <Translation>{(t) => t('Deposit List Slip')}</Translation>,
    element: Slip,
    exact: true,
  },
  {
    path: '/manual-transaction/trans-ref',
    name: <Translation>{(t) => t('Deposit List Trans Ref')}</Translation>,
    element: TransRef,
    exact: true,
  },
  {
    path: '/manual-transaction/manual',
    name: <Translation>{(t) => t('Deposit List Manual')}</Translation>,
    element: Manual,
    exact: true,
  },

  // manual-transaction
  {
    path: '/manual-history-deposit/manual',
    name: <Translation>{(t) => t('history deposit manual')}</Translation>,
    element: Manual_History,
    exact: true,
  },

  // bank-statement
  {
    path: '/bank-statement',
    name: <Translation>{(t) => t('Bank Statement')}</Translation>,
    element: Bank_statement,
    exact: true,
  },

  // reports
  {
    path: '/reports/dashboard-report',
    name: <Translation>{(t) => t('Overview Report')}</Translation>,
    element: DashboardReport,
    exact: true,
  },
  // {
  //   path: '/reports/dashboard-report-by-merchant',
  //   name: <Translation>{(t) => t('Overview All Merchant')}</Translation>,
  //   element: DashboardReport_By_Merchant,
  //   exact: true,
  // },
  {
    path: '/reports/chart-report',
    name: <Translation>{(t) => t('Overview')}</Translation>,
    element: ChartReport,
    exact: true,
  },
  // {
  //   path: '/reports/export-report',
  //   name: <Translation>{(t) => t('Download Report')}</Translation>,
  //   element: ExportReport,
  //   exact: true,
  // },

  // money-transfer
  {
    path: '/money-transfer',
    name: <Translation>{(t) => t('Transfer Money List')}</Translation>,
    element: MoneyTransfer,
    exact: true,
  },
  {
    path: '/money-transfer/create-money-transfer',
    name: <Translation>{(t) => t('Create Transfer Money')}</Translation>,
    element: CreateMoneyTransfer,
    exact: true,
  },

  // bank-management
  {
    path: '/bank-management/bank-accounts',
    name: <Translation>{(t) => t('Bank Account')}</Translation>,
    element: BankAccounts,
    exact: true,
  },
  // {
  //   path: '/bank-management/bank-account-groups',
  //   name: <Translation>{(t) => t('Bank account group')}</Translation>,
  //   element: BankAccountsGroups,
  //   exact: true,
  // },

  // Member
  {
    path: '/members',
    name: <Translation>{(t) => t('Manage Members')}</Translation>,
    element: Members,
    exact: true,
  },

   // Users
   {
    path: '/user-management/users',
    name: <Translation>{(t) => t('Admin')}</Translation>,
    element: Users,
    exact: true,
  },
  {
    path: '/user-management/history',
    name: <Translation>{(t) => t('history')}</Translation>,
    element: History,
    exact: true,
  },
  {
    path: '/user-management/role',
    name: <Translation>{(t) => t('Roles')}</Translation>,
    element: editRoless,
    exact: true,
  },
  {
    path: '/user-management/add-permission',
    name: <Translation>{(t) => t('Roles')}</Translation>,
    element: addPermission,
    exact: true,
  },
  {
    path: '/user-management/profile',
    name: <Translation>{(t) => t('Set up personal account')}</Translation>,
    element: Profile,
    exact: true,
  },
  {
    path: '/user-management/add-admin',
    name: <Translation>{(t) => t('add admin')}</Translation>,
    element: AddAdmin,
    exact: true,
  },
  {
    path: '/user-management/add-role',
    name: <Translation>{(t) => t('add role')}</Translation>,
    element: AddRole,
    exact: true,
  },
  {
    path: '/activity/activity-report',
    name: <Translation>{(t) => t('Activity Report')}</Translation>,
    element: Activity,
    exact: true,
  },
  {
    path: '/Instruction/index',
    name: <Translation>{(t) => t('Instruction')}</Translation>,
    element: Instruction,
    exact: true,
  },




// ***********************************//

  { path: '/theme/colors', name: <Translation>{(t) => t('colors')}</Translation>, element: Colors },
  {
    path: '/theme/typography',
    name: <Translation>{(t) => t('typography')}</Translation>,
    element: Typography,
  },
  {
    path: '/base',
    name: <Translation>{(t) => t('base')}</Translation>,
    element: Cards,
    exact: true,
  },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  {
    path: '/buttons',
    name: <Translation>{(t) => t('buttons')}</Translation>,
    element: Buttons,
    exact: true,
  },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/buttons/loading-buttons', name: 'Loading Buttons', element: LoadingButtons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  {
    path: '/forms',
    name: <Translation>{(t) => t('forms')}</Translation>,
    element: FormControl,
    exact: true,
  },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/multi-select', name: 'Multi Select', element: MultiSelect },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/date-picker', name: 'Date Picker', element: DatePicker },
  { path: '/forms/date-range-picker', name: 'Date Range Picker', element: DateRangePicker },
  { path: '/forms/time-picker', name: 'Time Picker', element: TimePicker },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  {
    path: '/icons',
    exact: true,
    name: <Translation>{(t) => t('icons')}</Translation>,
    element: CoreUIIcons,
  },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  {
    path: '/notifications',
    name: <Translation>{(t) => t('notifications')}</Translation>,
    element: Alerts,
    exact: true,
  },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  {
    path: '/plugins',
    name: <Translation>{(t) => t('plugins')}</Translation>,
    element: Calendar,
    exact: true,
  },
  {
    path: '/plugins/calendar',
    name: <Translation>{(t) => t('calendar')}</Translation>,
    element: Calendar,
  },
  {
    path: '/plugins/charts',
    name: <Translation>{(t) => t('charts')}</Translation>,
    element: Charts,
  },
  { path: '/plugins/google-maps', name: 'GoogleMaps', element: GoogleMaps },
  { path: '/smart-table', name: 'Smart Table', element: SmartTable },
  { path: '/widgets', name: <Translation>{(t) => t('widgets')}</Translation>, element: Widgets },
  {
    path: '/apps',
    name: <Translation>{(t) => t('apps')}</Translation>,
    element: Invoice,
    exact: true,
  },
  { path: '/apps/invoicing', name: 'Invoice', element: Invoice, exact: true },
  { path: '/apps/invoicing/invoice', name: 'Invoice', element: Invoice },
  { path: '/apps/email', name: 'Email', exact: true },
  { path: '/apps/email/inbox', name: 'Inbox', exact: true },
  { path: '/apps/email/compose', name: 'Compose', exact: true },
  { path: '/apps/email/message', name: 'Message', exact: true },
]

export default routes
