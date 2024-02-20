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

import React from 'react'
import { toJS } from 'mobx'
import { Avatar } from 'components/Base'
import Table from 'components/Tables/List'
import { withProjectList } from 'components/HOCs/withList'
import { getLocalTime, getDisplayName } from 'utils'
import Banner from 'components/Cards/Banner'
import AIPlatformStore from '../../../../../stores/aiplatform'

@withProjectList({
  store: new AIPlatformStore(),
  module: 'aiplatformtrainray',
  name: 'trainray',
  rowKey: 'name',
})
export default class TrainRay extends React.Component {
  get store() {
    return this.props.store
  }

  componentDidMount() {
    this.getData()
  }

  getData = params => {
    this.store.fetchList({
      ...params,
      cluster: this.props.match.params.cluster,
      namespace: this.props.match.params.namespace,
    })
  }

  showCreateRay = () => {}

  get itemActions() {
    return [
      {
        key: 'dashboard',
        icon: 'ip',
        text: '查看Ray Dashboard',
        onClick: item =>
          this.props.trigger('resource.delete', {
            type: 'CUSTOM_RESOURCE',
            detail: item,
            success: this.getData,
          }),
      },
      {
        key: 'create',
        icon: 'ip',
        text: '创建',
        onClick: () => {
          this.props.trigger('aiplatform.ray.create', {
            module: this.props.module,
            namespace: this.props.match.params.namespace,
            cluster: this.props.match.params.cluster,
            success: this.getData,
          })
        },
      },
    ]
  }

  get columns() {
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            title={getDisplayName(record)}
            desc={record.description}
            noLink
          />
        ),
      },
      {
        title: '状态',
        dataIndex: '_originData.status.jobStatus',
      },
      {
        title: '启动时间',
        dataIndex: '_originData.status.startTime',
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '结束时间',
        dataIndex: '_originData.status.endTime',
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  render() {
    const { data, name, page, total, limit, isLoading } = this.store.list
    const pagination = { page, total, limit }
    const filters = { name }

    return (
      <div>
        <Banner
          icon={'ai'}
          title={'分布式训练-Ray'}
          description={
            '基于Ray的分布式任务调度和管理系统，用于在大规模集群上执行各种计算任务和工作负载。'
          }
        />
        <Table
          data={toJS(data)}
          columns={this.columns}
          isLoading={isLoading}
          onFetch={this.getData}
          onCreate={this.showCreateRay}
          itemActions={this.itemActions}
          // enabledActions={this.enabledActions}
          pagination={pagination}
          filters={filters}
          showEmpty={false}
          searchType="name"
          hideCustom
        />
      </div>
    )
  }
}
