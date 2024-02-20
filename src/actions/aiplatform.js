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
import { get } from 'lodash'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import FORM_TEMPLATES from 'utils/form.templates'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_STEPS from 'configs/steps/aiplatform.trainray'
import CreateModal from 'components/Modals/Create'

export default {
  'aiplatform.ray.create': {
    on({
      store,
      detail,
      success,
      namespace,
      cluster,
      module,
      isFederated,
      ...props
    }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = {
        [kind]: FORM_TEMPLATES[module]({
          namespace,
        }),
      }

      const modal = Modal.open({
        onOk: async newObject => {
          const data = get(newObject, kind)

          if (!data) {
            return
          }

          store
            .create(data, {
              cluster,
              namespace: namespace || get(data, 'metadata.namespace'),
            })
            .then(() => {
              Modal.close(modal)

              Notify.success({ content: t('CREATE_SUCCESSFUL') })
              success && success(data)
            })
        },
        module,
        cluster,
        namespace,
        name: kind,
        isFederated,
        formTemplate,
        steps: FORM_STEPS,
        modal: CreateModal,
        store,
        ...props,
      })
    },
  },
}
