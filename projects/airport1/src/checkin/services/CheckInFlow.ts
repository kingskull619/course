import { Builder } from 'builder-pattern'
import { Session } from '../model/session'
import { Context } from '../model/Context'
import { RequestData } from '@http/Request'
import { ResponseData } from '@http/Response'
import sessionUtils from './sessionManager'
import ValidateSessionStep from './flow/step/ValidateSessionStep'
import PassportInformationStep from './flow/step/PassportInformationStep'
import AgreementSignStep from './flow/step/AgreementSignStep'

export const initFLow = async (rquestData: RequestData): Promise<ResponseData> => {
  try {
    const session: Session = await sessionUtils.mapInitRequestToSession(rquestData)
    await sessionUtils.saveSession(session)

    return Builder<ResponseData>()
      .sessionId(session.sessionId)
      .build()
  } catch (e) {
    console.error(e)
    return Builder<ResponseData>()
      .status('rejected')
      .build()
  }
}

export const checkInFlow = async (requestData: RequestData): Promise<ResponseData> => {
  try {
    const context = await initFlowContext(requestData)
    return await executeFlow(context)
  } catch (e) {
    console.error(e)
    return Builder<ResponseData>()
      .status('rejected')
      .build()
  }
}

const executeFlow = async (context: Context): Promise<ResponseData> => {
  if (!(await new ValidateSessionStep().execute(context))) {
    return await endFlowContext(context)
  }

  if (!(await new PassportInformationStep().execute(context))) {
    return await endFlowContext(context)
  }

  if (!(await new AgreementSignStep().execute(context))) {
    return await endFlowContext(context)
  }

  context = context.withResponseBuilder(rb => rb.status('completed'))
  return await endFlowContext(context)
}

const initFlowContext = async (requestData: RequestData): Promise<Context> => {
  const session: Session = await sessionUtils.getSession(requestData)
  const responseData = Builder<ResponseData>().status('rejected').build()
  return new Context(session, requestData, responseData)
}

const endFlowContext = async (context: Context): Promise<ResponseData> => {
  context = context.withResponseBuilder(rb => rb
    .sessionId(context.getSession().sessionId)
  )
  await sessionUtils.saveSession(context.getSession())
  return context.getResponse()
}
