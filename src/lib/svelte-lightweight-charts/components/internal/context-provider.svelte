<script >;
import { context } from './utils';
export let value;
$: context(value);
</script>
<slot/>
