import { useState } from "react";
import { useIsComponentMounted } from "@/common/hooks/use-is-component-mounted";

export function useStateIfMounted(initialValue: any): Array<any> {
  const isComponentMounted = useIsComponentMounted();
  const [state, setState] = useState(initialValue);
  function newSetState(value: any) {
    if (isComponentMounted.current) {
      setState(value);
    }
  }
  return [state, newSetState];
}
