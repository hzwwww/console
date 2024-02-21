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

import { Form } from '@kube-design/components'
import { get } from 'lodash'
import React from 'react'
import { MODULE_KIND_MAP } from 'utils/constants'
import Base from 'components/Forms/Workload/ContainerSettings'
import { NumberInput } from 'components/Inputs'
import styles from './index.scss'

export default class WorkerSettings extends Base {
  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  render() {
    const { formRef } = this.props
    const { showContainer, selectContainer } = this.state

    if (showContainer) {
      return this.renderContainerForm(selectContainer)
    }

    return (
      <div>
        <Form data={this.formTemplate} ref={formRef}>
          <Form.Item
            label={t('容器组数量')}
            desc={t('')}
            rules={[{ required: true, message: t('请设置容器组数量') }]}
            className={styles.form}
          >
            <NumberInput name="spec.rayClusterSpec.workerGroupSpecs[0].replicas" />
          </Form.Item>
          {this.renderContainerList()}
        </Form>
      </div>
    )
  }
}
