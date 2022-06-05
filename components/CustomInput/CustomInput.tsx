import { ChangeEventHandler } from 'react'
import { Form } from 'react-bootstrap'
import { CustomInputContainer } from './CustomInputContainer.styled'

interface ICustomInputProps {
  title: string
  id: string
  handleChange: (e: any) => void
  defaultValue?: String
}
const CustomInput = ({ title, id, handleChange, defaultValue = '' }: ICustomInputProps) => {
  return (
    <CustomInputContainer>
      <Form.Label htmlFor={title} className='fw-bold fs-5'>
        {title}
      </Form.Label>
      <Form.Control
        type='text'
        id={id}
        title={title}
        onChange={handleChange}
        defaultValue={defaultValue as string}
        placeholder={title}
        required
        maxLength={title === 'Topic' ? 30 : 80}
      />
    </CustomInputContainer>
  )
}

export default CustomInput
