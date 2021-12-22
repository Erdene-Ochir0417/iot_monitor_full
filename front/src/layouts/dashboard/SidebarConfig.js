import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import baselineSensors from '@iconify/icons-ic/baseline-sensors';
import settingFilled from '@iconify/icons-ant-design/setting-filled';
import textLinkAnalysis from '@iconify/icons-carbon/text-link-analysis';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Хянах самбар',
    path: '/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Төхөөрөмж',
    path: '/devices',
    icon: getIcon(baselineSensors)
  }
  // {
  //   title: 'Тохиргоо',
  //   path: '/dashboard/setting',
  //   icon: getIcon(settingFilled)
  // }
];

export default sidebarConfig;