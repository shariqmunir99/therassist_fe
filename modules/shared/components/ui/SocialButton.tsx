import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'google' | 'apple';
  children: React.ReactNode;
}

export function SocialButton({
  provider,
  children,
  className,
  ...props
}: SocialButtonProps) {
  const logos = {
    google:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDaAJvS9pHZFQ7FOC9uMHlHOqA84uaAOzE1vAMaCPYMQEPXRFR_7Tc_yi_rUBMjkIIktCwofRJYr3xyUp0hFFLpfVz8tKKMP9hXBokDc0ProR0kvWHqE2SIPd36lcd3KGKz_pWhtbOM9wmW9l4tUvE7L3kBOMig1NMoUpycv_mDANkeumxVV1DB3jDK42hhqF8vVg776O7JQeHOrfoxu6LX8PU78jlg0bAiaeJ5ppqt5036tDRuTSgwGi6cMnBkBWhzdVpgDm0BWkU',
    apple:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJsOqo6tlpvzjql3XSmeGkoKey23v1EySBpx7NuHEr0GoafPXIHCtnUj5wcdUc4OAcP1-ReU-Dj6SPUDut-i6KJryv9R_ruIshSlLd0u4ZPJ_S_a7CUqd4uC73ItgA4WxQ641sVTlYpsU5KOxWFoOiS6TVso-dzQbsX7sPvOd-SRYQUOqfN0MRANzTJRyykUDiKq6xuQiuSKOKeFoOU3ZEbNEMEIHZu64XfbxqEQ842FHrKoKG_BSBRtJJcGkoGJC-72h7sjm6k9c',
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        'flex items-center justify-center w-full h-14 rounded-xl text-base font-semibold leading-normal transition-colors',
        provider === 'google' &&
          'border border-gray-200 bg-white text-[#1D1D1F] hover:bg-gray-50',
        provider === 'apple' && 'border bg-black text-white hover:bg-gray-800',
        className
      )}
      {...props}
    >
      <Image
        alt={`${provider} logo`}
        className={cn(
          provider === 'apple' && 'brightness-0 invert'
        )}
        src={logos[provider]}
        style={
          provider === 'apple'
            ? { filter: 'brightness(0) invert(1)' }
            : undefined
        }
        width={24}
        height={24}
      />
      {children}
    </Button>
  );
}
