#import "PleakDeviceInfo.h"

@implementation PleakDeviceInfo

RCT_EXPORT_MODULE()

- (NSString *) userAgent
{
  #if TARGET_OS_TV
    return @"OS TV, user agent not available"
  #else
    UIWebView* webView = [[UIWebView alloc] initWithFrame:CGRectZero];
    return [webView stringByEvaluatingJavaScriptFromString:@"navigator.userAgent"];
  #endif
}

- (NSDictionary *) constantsToExport
{
  return @{
    @"userAgent": self.userAgent ?: [NSNull null],
  };
}

@end
