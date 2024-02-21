/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import { withProps } from 'utils'

import BaseInfo from 'components/Forms/AIPlatform/TrainRay/BaseInfo'
import HeadSettings from 'components/Forms/AIPlatform/TrainRay/HeadSettings'
import WorkerSettings from 'components/Forms/AIPlatform/TrainRay/WorkerSettings'
import VolumeSettings from 'components/Forms/Workload/VolumeSettings'
import AdvanceSettings from 'components/Forms/Workload/AdvanceSettings'

export default [
  {
    title: 'BASIC_INFORMATION',
    component: BaseInfo,
    required: true,
    icon: 'cdn',
  },
  {
    title: 'Head容器组设置',
    icon: 'cluster',
    component: withProps(HeadSettings, {
      prefix: 'spec.rayClusterSpec.headGroupSpec.template.',
    }),
    required: true,
  },
  {
    title: 'Worker容器组设置',
    icon: 'cluster',
    component: withProps(WorkerSettings, {
      prefix: 'spec.rayClusterSpec.workerGroupSpecs[0].template.',
    }),
    required: true,
  },
  {
    title: 'Head存储设置',
    icon: 'storage',
    component: withProps(VolumeSettings, {
      prefix: 'spec.rayClusterSpec.headGroupSpec.template.',
    }),
    required: true,
  },
  {
    title: 'ADVANCED_SETTINGS',
    icon: 'slider',
    component: AdvanceSettings,
    required: true,
  },
]
