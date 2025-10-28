<template>
  <font-awesome-icon :icon="icon" :color="color" :style="{ fontSize: size }" />
</template>

<script setup>
import { computed } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far, fab)

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  iconStyle: {
    type: String,
    default: 'solid',
    validator: (value) => ['solid', 'regular', 'brands'].includes(value),
  },
  size: {
    type: String,
    default: '16px',
  },
  color: {
    type: String,
    default: '#B5B5C3',
  },
})

const icon = computed(() => {
  switch (props.iconStyle) {
    case 'solid':
      return ['fas', props.iconName]
    case 'regular':
      return ['far', props.iconName]
    case 'brands':
      return ['fab', props.iconName]
    default:
      return ['fas', props.iconName]
  }
})
</script>