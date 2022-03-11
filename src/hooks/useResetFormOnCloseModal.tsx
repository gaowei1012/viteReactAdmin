import { useEffect, useRef } from 'react'

const useResetFormOnCloseModal = (props: { visible: any; form: any }) => {
  const { visible, form } = props
  const prevVisibleRef = useRef()
  useEffect(() => {
    prevVisibleRef.current = visible
  }, [visible])
  const prevVisible = prevVisibleRef.current
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields()
    }
  }, [visible])
}

export default useResetFormOnCloseModal
