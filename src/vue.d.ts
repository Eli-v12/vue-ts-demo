import { ElMessage } from 'element-ui/types/message';
import { ElMessageBox } from 'element-ui/types/message-box';
import Vue  from '@/vue'
declare module "vue/types/vue"
interface Vue {
  $message:ElMessage  
  $messageBox:ElMessageBox
}