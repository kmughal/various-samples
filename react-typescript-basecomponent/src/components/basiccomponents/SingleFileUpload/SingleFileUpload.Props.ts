import IBaseProps from "../../IBase.Props"


interface SingleFileUploadProps extends IBaseProps{
  /**
   * accept is the property which can used to limit the type of files
   */
  accept? : string
}

export default SingleFileUploadProps